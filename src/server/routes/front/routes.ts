import express, { Request, Response, Router } from "express";
import config from "../../../../config";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";
import { GetProducts, GetProduct} from "../../../interfaces/product.interface";
import { GetUsers, GetUser} from "../../../interfaces/user.interface";
import { GetHome} from "../../../interfaces/home.interface";
import { AuthService } from "../../../services/auth.service";
import { GetTransactions } from "../../../interfaces/transaction.interface";

const router: Router = express.Router();

router.get("/", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const response = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
});
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
 
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/home.ejs`, formattedResponse);
})

router.get("/products", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`);
  const productData = await response.json();
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/products.ejs`, formattedResponse);
})

router.get("/product/:productId", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting}/products/${_req.params.productId}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;

  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(formattedResponse);
})

router.get("/products/:productId", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`, {
    method:"get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;

  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/detailsProduct.ejs`, formattedResponse);
})

router.get("/products/productByName/:name", async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(formattedResponse);
})

router.put("/product/update", AuthService.authUser, async(_req: Request, res:Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting}/product/update`, {
    method:"put",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const statusResponse = await response.json();
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(statusResponse);
})

router.delete("/admin/product/:productId", AuthService.authUser, async(_req: Request, res:Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting}/admin/product/${_req.params.productId}`, {
    method:"delete",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const statusResponse = await response.json();
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(statusResponse);
})

router.get("/transactions", async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  
  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}/user/${formattedResponseLogged.userId}`);
  const transactionData = await response.json();
  const formattedResponse: GetTransactions = JSON.parse(JSON.stringify(transactionData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/transactions.ejs`, formattedResponse);
})

router.get("/comprarUnique/:productId", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));

  const response = await fetch(`http://localhost:${Ports.Enrouting}/products/${_req.params.productId}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/comprarUnique.ejs`, formattedResponse);
})

router.get("/comprar", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));

  const response = await fetch(`http://localhost:${Ports.Enrouting}/products`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/comprar.ejs`, formattedResponse);
})

router.post("/comprar", AuthService.authUser, async(_req: Request, res: Response) => {
  var status;
  _req.body.typetransaction = "Comprar";
  _req.body.datetransaction = new Date();

  const quantitySelected: number = +_req.body.quantity;
  if(_req.body.name != "-" && quantitySelected > 0)
  {
    const responseProduct = await fetch(`http://localhost:${Ports.Enrouting}/products/${_req.body.productId}`, {
      method: "get",
      headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
    });
    const productData = await responseProduct.json();
    const formattedResponseProduct: GetProduct = JSON.parse(JSON.stringify(productData));
    if(quantitySelected > formattedResponseProduct.productData.quantity)
    {
      status = {statusSell:"No enough units"};
    }
    else
    {
      _req.body.productId = formattedResponseProduct.productData.productId;
      const responseUser = await fetch(`http://localhost:${Ports.Enrouting}/user/findByEmail/${_req.session.email}`, {
        method: "get",
        headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
      });
      const userData = await responseUser.json();
      const formattedResponseUser: GetUser = JSON.parse(JSON.stringify(userData));
      _req.body.userId = formattedResponseUser.userData.userId;
      _req.body.quantity = formattedResponseProduct.productData.quantity - quantitySelected;
      _req.body.quantitySelected = quantitySelected;
      const response = await fetch(`http://localhost:${Ports.Enrouting}/transaction/comprar`, {
        method:"post",
        body: JSON.stringify(_req.body),
        headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
      });
      status = await response.json();
    }
  }
  else
  {
    status = {statusBuy:"Fields not completed"};
  }
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(status);
})

router.get("/venderUnique/:productId", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));

  const response = await fetch(`http://localhost:${Ports.Enrouting}/products/${_req.params.productId}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProduct = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/venderUnique.ejs`, formattedResponse);
})

router.get("/vender", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });

  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));

  const response = await fetch(`http://localhost:${Ports.Enrouting}/products`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const productData = await response.json();
  const formattedResponse: GetProducts = JSON.parse(JSON.stringify(productData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;

  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/vender.ejs`, formattedResponse);
})

router.post("/vender", AuthService.authUser, async(_req: Request, res: Response) => {
  var status;

  if(_req.body.name != "-" && _req.body.quantity > 0)
  {
    const responseUser = await fetch(`http://localhost:${Ports.Enrouting}/user/findByEmail/${_req.session.email}`, {
      method: "get",
      headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
    });
    const userData = await responseUser.json();
    const formattedResponseUser: GetUser = JSON.parse(JSON.stringify(userData));
    _req.body.userId = formattedResponseUser.userData.userId;

      const response = await fetch(`http://localhost:${Ports.Enrouting}/transaction/vender`, {
        method:"post",
        body: JSON.stringify(_req.body),
        headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
      });
      status = await response.json();
  }
  else
  {
    status = {statusSell:"Fields not completed"};
  }
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(status);
})

router.get("/register", async(req: Request, res: Response) => {
  const response = {
    logged : false,
    userId : false,
    rol : null,
  }
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(response));
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/register.ejs`, formattedResponse);
})

router.post("/register", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting}/user`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const statusData = await response.json();
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(statusData);
})


router.get("/login", async(req : Request, res : Response) => {
  const response = {
    logged : false,
    userId : false,
    rol : null,
  }
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(response));
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/login.ejs`, formattedResponse);
})

router.post("/login", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await response.json();
  const formattedResponse: GetHome = JSON.parse(JSON.stringify(homeData));
  if(formattedResponse.logged)
  {
    AuthService.generateSession(req);
  }
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(formattedResponse);
})

router.get("/logout", async(_req: Request, res: Response) => {
  await fetch(`http://localhost:${Ports.Enrouting + _req.url}/${_req.session.email}`, {
      method:"delete",
      headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
    });
  if (_req.session) {
    _req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.redirect("/");
})

router.get("/users", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting + _req.url}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const userData = await response.json();
  const formattedResponse: GetUsers = JSON.parse(JSON.stringify(userData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/users.ejs`, formattedResponse);
})

router.get("/users/:userId/update", AuthService.authUser, async(_req: Request, res: Response) => {
  _req.body.email = _req.session.email;
  const responseLogged = await fetch(`http://localhost:${Ports.Enrouting}/checkLogged`, {
    method:"post",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const homeData = await responseLogged.json();
  const formattedResponseLogged: GetHome = JSON.parse(JSON.stringify(homeData));  

  const response = await fetch(`http://localhost:${Ports.Enrouting}/users/${_req.params.userId}`, {
    method: "get",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  const userData = await response.json();
  const formattedResponse: GetUser = JSON.parse(JSON.stringify(userData));
  formattedResponse.logged = formattedResponseLogged.logged;
  formattedResponse.userId = formattedResponseLogged.userId;
  formattedResponse.rol = formattedResponseLogged.rol;
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.render(`${config.rootFolder}/src/views/updateUser.ejs`, formattedResponse);
})

router.put("/users/user/update", AuthService.authUser, async(_req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting}/user/update`, {
    method:"put",
    body: JSON.stringify(_req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(await response.json());
})


router.delete("/rol/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Enrouting + req.url}`, {
    method:"delete",
    headers: {"X-version":"1", "X-sender-service":"app", "X-destination-service":"enrouting"},
  });
  res.header("X-version","1");
  res.header("X-sender","app");
  res.header("X-destination","interface");
  res.send(await response.json());
});


export default router;
