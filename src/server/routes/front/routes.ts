import express, { Request, Response, Router } from "express";
import config from "../../../../config";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";
import { GetProducts, GetProduct} from "../../../interfaces/product.interface";
import { GetUsers, GetUser} from "../../../interfaces/user.interface";
import { GetTransactions, GetTransaction} from "../../../interfaces/transaction.interface";
import { GetHome} from "../../../interfaces/home.interface";


const router: Router = express.Router();

router.get("/", (req, res) => {
  const response = {
    logged : false,
    userId : false,
    admin : null,
  }
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(response));
  res.render(`${config.rootFolder}/src/views/home.ejs`, formattedResponse);
})

router.get("/products", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(productData));
  res.render(`${config.rootFolder}/src/views/products.ejs`, formattedResponse);
})

router.get("/products/:productId", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));

  res.render(`${config.rootFolder}/src/views/detailsProduct.ejs`, formattedResponse);
})

router.get("/comprar", (req, res) => {
  const response = {
    logged : false,
    userId : false,
    admin : null,
  }
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(response));
  res.render(`${config.rootFolder}/src/views/comprar.ejs`, formattedResponse);
})

router.get("/vender", (req, res) => {
  const response = {
    logged : false,
    userId : false,
    admin : null,
  }
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(response));
  res.render(`${config.rootFolder}/src/views/vender.ejs`, formattedResponse);
})

router.get("/users", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const userData = await response.json();
  const formattedResponse: GetUsers = JSON.parse(JSON.stringify(userData));
  res.render(`${config.rootFolder}/src/views/users.ejs`, formattedResponse);
})


router.delete("/admin/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + req.url}`, {
    method:"delete",
  });
  res.send(await response.json());
});


export default router;
