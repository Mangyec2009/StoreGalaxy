import axiosRequest from "@/utils/axiosRequest";
import { create } from "zustand";

export const useStore = create((set, get) => ({
    data: [],
    getData: async () => {
        try {
            let {data} = await axiosRequest("/Category/get-categories");
            console.log(data.data);
            set({data: data.data});
        } catch (error) {
            console.error(error);
        }
    },
    category: {},
    getCatId: async (id) => {
        try {
            let {data} = await axiosRequest(`/Category/get-category-by-id?id=${id}`);
            set({category: data.data});
        } catch (error) {
            
        }
    },
    products: [],
    getProdAll: async () => {
        try {
            let {data} = await axiosRequest(`/Product/get-products?PageSize=1000`);
            console.log(data);
            set({products: data.data.products});
        } catch (error) {
            console.error(error);
        }
    },
    getProd: async (request, id) => {
        try {
            set({products: []});
            let {data} = await axiosRequest(`/Product/get-products?${request}=${id}`);
            console.log(data);
            set({products: data?.data?.products});
        } catch (error) {
            console.error(error);
        }
    },
    brands: [],
    getBrands: async () => {
        try {
            let {data} = await axiosRequest(`/Brand/get-brands`);
            set({brands: data.data});
        } catch (error) {
            console.error(error);
        }
    },
    dataCard: [],
    getCard: async () => {
        try {
          const { data } = await axiosRequest.get("/Cart/get-products-from-cart");
          set({ dataCard: data.data });
        } catch (error) {
          console.log("Error fetching Card:", error);
        }
    },
    AddCard: async (id) => {
        try {
          const { data } = await axiosRequest.post(
            `/Cart/add-product-to-cart?id=${id}`
          );
          set({ dataCard: data.data.products });
          get().getProdAll();
        } catch (error) {
          console.log("Error fetching AddCard:", error);
        }
      },
      incresNum: async (id) => {
        try {
          const { data } = await axiosRequest.put(
            `/Cart/increase-product-in-cart?id=${id}`
          );
          get().getCard()
        } catch (error) {
          console.log("Error fetching AddCard:", error);
        }
      },
      decresNum: async (id) => {
        try {
          const { data } = await axiosRequest.put(
            `/Cart/reduce-product-in-cart?id=${id}`
          );
          get().getCard()
        } catch (error) {
          console.log("Error fetching AddCard:", error);
        }
      },
      deleteCard: async (id) => {
        try {
          const { data } = await axiosRequest.delete(
            `/Cart/delete-product-from-cart?id=${id}`
          );
          get().getCard()
        } catch (error) {
          console.log("Error fetching AddCard:", error);
        }
      },
      deleteAllCard: async (id) => {
        try {
          const { data } = await axiosRequest.delete(`/Cart/clear-cart`);
          set({ dataCard: data.data.products });
        } catch (error) {
          console.log("Error fetching AddCard:", error);
        }
      },
      minMax: {},
      getMinMax: async () => {
          try {
            let {data} = await axiosRequest(`/Product/get-products`);
            set({minMax: data.data.minMaxPrice})
          } catch (error) {
            console.error(error);
          }
      },
      getByPrice: async (min, max) => {
        try {
          let {data} = await axiosRequest(`/Product/get-products?MinPrice=${min}&MaxPrice=${max}`);
          set({products: data.data.products});
        } catch (error) {
          console.error(error);
        }
      },
      product: {},
      getById: async (id) => {
        try {
            let {data} = await axiosRequest(`/Product/get-product-by-id?id=${id}`);
            set({product: data.data});
        } catch (error) {
          console.error(error);
        }
      },
      cartCnt: 0,
      plusCnt: () => set({cartCnt: get().cartCnt+1}),
      defCnt: () => set({cartCnt: 0}),
}))