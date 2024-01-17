import { FC, useEffect, useState } from "react";
import { AxiosError } from "axios";

import { IGroup } from "../../models";
import { getGroups } from "../../services/Group";
import Group from "../Group/Group";
// import { Pagination } from "@mui/material";

interface IGroupsProps {
  userId: string;
}
const Groups: FC<IGroupsProps> = ({ userId }) => {
  const [groups, setGroups] = useState<Array<IGroup>>([]);
  // const [currentPage, setCurrentPage] = useState<number>(0);
  // const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    getGroups(userId)
      .then((groupsPaginated) => {
        setGroups(groupsPaginated);
        // setCurrentPage(groupsPaginated.currentPage);
        // setTotalPages(groupsPaginated.totalPages);

        return;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  // const handlePageChange = () => {
  //   getGroups()
  //     .then((groupsPaginated) => {
  //       setGroups(groupsPaginated);
  //       // setCurrentPage(groupsPaginated.currentPage);
  //       // setTotalPages(groupsPaginated.totalPages);

  //       return;
  //     })
  //     .catch((error: AxiosError) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="groups">
      {groups.map((group, key) => (
        <Group key={key} group={group} />
      ))}
      {/* <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
      /> */}
    </div>
  );
};

export default Groups;
