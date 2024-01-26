import IApiRes, { Response } from "../types/response";

const asyncWrapper = async (fn: () => Promise<Response>) => {
  try {
    return await fn();
  } catch (error) {
    const { response: { data } } = error as IApiRes;
    console.log(data)
    return data
  }
}

export default asyncWrapper;