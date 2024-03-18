import axios from "axios";
import { BASE_URL, CURRENT_USER } from "../libs/constants";
import { GetLocalValue } from "../libs/Commons/UseLocalStorage";

export async function getProductByStoreId(param) {
  let STOREID = GetLocalValue("store").id;
  let url =
    BASE_URL +
    "/stores/" +
    STOREID +
    "/products?pageNumber=0" +
    param.pageNumber +
    "&pageSize=5";

  if (param.cateName !== null && param.cateName !== undefined) {
    url =
      BASE_URL +
      "/stores/" +
      STOREID +
      "/products?pageNumber=0" +
      param.pageNumber +
      "&pageSize=5" +
      "&CategoryName=" +
      param.cateName;
  }

  if (param.productName !== null && param.productName !== undefined) {
    url =
      BASE_URL +
      "/stores/" +
      STOREID +
      "/products?pageNumber=0" +
      param.pageNumber +
      "&pageSize=5" +
      "&Name=" +
      param.productName;
  }
  console.log(url);
  var response = await axios
    .get(url, {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err.message);
    });
  return response.data;
}

export async function UpdateProduct(product) {
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
  if ("file" in product) {
    formData.append("Image", product.file);
  }

  const response = await axios
    .put(BASE_URL + "/products/" + product.id, formData, {
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${CURRENT_USER.token}`,
      },
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return response;
}

export async function CreateProduct(product) {
  let STOREID = GetLocalValue("store").id;
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
  formData.append("Image", product.file);

  const response = await axios
    .post(BASE_URL + "/products", formData, {
      headers: {
        "Content-Type": " multipart/form-data",
        Authorization: `Bearer ${CURRENT_USER.token}`,
      },
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  return response;
}

export async function DeleteProduct(id) {
  const response = await axios
    .delete(BASE_URL + "/products/" + id, {
      headers: { Authorization: `Bearer ${CURRENT_USER.token}` },
    })
    .catch((err) => {
      console.log(err.message);
    });

  return response;
}
