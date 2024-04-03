import axios from "axios";
import { BASE_URL } from "../libs/constants";

export async function getProductByStoreId(param) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // '/products?menuId=35512226-b59c-44e2-af5c-4e823970935a&CategoryName=Cate%20-%202&pageNumber=0&pageSize=10'
  // console.log(param);
  let STOREID = CURRENT_USER.user.storeId;
  let url = null;
  if (param.menuId !== undefined) {
    url =
      BASE_URL +
      "/stores/" +
      STOREID +
      "/products?pageNumber=0" +
      param.pageNumber +
      "&pageSize=5&menuId=" +
      param.menuId;
  }

  if (param.cateName !== null && param.cateName !== undefined) {
    url =
      BASE_URL +
      "/stores/" +
      STOREID +
      "/products?pageNumber=" +
      param.pageNumber +
      "&pageSize=5" +
      "&CategoryName=" +
      param.cateName +
      "&menuId=" +
      param.menuId;
  }
  // console.log(url);
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  // console.log(response.data);
  return response.data;
}

export async function getAllProductByStoreId(param) {
  // console.log(param);
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  let STOREID = CURRENT_USER.user.storeId;
  let url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/products?pageNumber=0" +
    param.pageNumber +
    "&pageSize=100";

  // console.log(url);
  var response = await axios.get(url, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  // console.log(response.data);
  return response.data;
}

export async function UpdateProduct(product) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // console.log("Product:", product);
  var formData = new FormData();
  formData.append("Id", product.id);
  formData.append("CategoryId", product.categoryId);
  formData.append("Name", product.name);
  formData.append("Price", product.price);
  formData.append("Description", product.description);
  formData.append("PreparationTime", product.preparationTime);
  formData.append("NumProcessParallel", product.numProcessParallel);
  formData.append("ManufacturingDate", product.manufacturingDate);
  formData.append("ExpirationDate", product.expirationDate);
  formData.append("StoreId", product.storeId);
  formData.append("Status", "Active");
  formData.append("MenuId", product.menuId);
  formData.append("QuantityInDay", product.quantityInDay);
  formData.append("ProductMenuId", product.productMenuId);
  if ("file" in product) {
    formData.append("Image", product.file);
  }

  const response = await axios.put(
    BASE_URL + "/products/" + product.id,
    formData,
    {
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${CURRENT_USER.token}`,
      },
    }
  );
  return response;
}

export async function CreateProduct(product) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  // console.log("Product:", product);
  let STOREID = CURRENT_USER.user.storeId;
  var formData = new FormData();
  formData.append("CategoryId", product.categoryId);
  formData.append("Name", product.name);
  formData.append("Price", product.price);
  formData.append("Description", product.description);
  formData.append("PreparationTime", product.preparationTime);
  formData.append("NumProcessParallel", product.numProcessParallel);
  formData.append("ManufacturingDate", product.manufacturingDate);
  formData.append("ExpirationDate", product.expirationDate);
  formData.append("StoreId", STOREID);
  formData.append("MenuId", product.menuId);
  formData.append("QuantityInDay", product.quantityInDay);
  formData.append("Image", product.file);

  const response = await axios.post(BASE_URL + "/products", formData, {
    headers: {
      "Content-Type": " multipart/form-data",
      Authorization: `Bearer ${CURRENT_USER.token}`,
    },
  });

  return response;
}

export async function DeleteProduct(id) {
  var CURRENT_USER = JSON.parse(localStorage.getItem("user"));
  const response = await axios.delete(BASE_URL + "/products/" + id, {
    headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
  });
  return response;
}
