import axios from "axios";

import { Config } from "./Config";
import { Interceptor } from "./Interceptor";

export const Base = Interceptor(axios.create(Config));
