import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { IGroup } from "../../models";
import { getGroups } from "../../services/Group";
import Group from "../Group/Group";
import { Pagination } from "@mui/material";

const Groups = () => {
  const [groups, setGroups] = useState<Array<IGroup>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    getGroups(1, 10)
      .then((groupsPaginated) => {
        setGroups(groupsPaginated.items);
        setCurrentPage(groupsPaginated.currentPage);
        setTotalPages(groupsPaginated.totalPages);

        return;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    getGroups(page, 10)
      .then((groupsPaginated) => {
        setGroups(groupsPaginated.items);
        setCurrentPage(groupsPaginated.currentPage);
        setTotalPages(groupsPaginated.totalPages);

        return;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  return (
    <div className="groups">
      {groups.map((group) => (
        <Group key={group._id} group={group} />
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default Groups;
