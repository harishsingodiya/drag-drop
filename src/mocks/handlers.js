import { rest } from "msw";
import { updateData, getStoreData } from "../helper";



// remember you have to match the params that you're passing here
const getData = rest.get("http://localhost:3000/data", async (req, res, ctx) => {
  const result = await getStoreData();
  return res(ctx.json(result[0].data.data));
});

// remember you have to match the params that you're passing here
const putData = rest.put("http://localhost:3000/data", async (req, res, ctx) => {
  const data = req.body.data;
  const result = await updateData(data);
  return res(ctx.json(result));
});

//it returns array of request handlers
export const handlers = [getData, putData];
