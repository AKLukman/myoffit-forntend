import { baseApi } from "../../api/baseApi";

const productsManagementApi =baseApi.injectEndpoints({
    endpoints:(builder)=>({
        addProduct: builder.mutation({
            query:(data)=>({
                url:"/products/create-product",
                method:'POST',
                body:data
            }),
            invalidatesTags:['products']
        }),
        
    getAllProducts: builder.query({
        query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: '/products',
          method: 'GET',
          params: params,
        };
      },
      providesTags:['products'],
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    deleteAPeoduct:builder.mutation({
        query:(id)=>({
            url:`/products/${id}`,
            method:'DELETE'
        }),
        invalidatesTags:['products']
    }),
    getSingleProduct:builder.query({
      query:(id)=>({
        url:`/products/${id}`,
        method:"GET"
      })
    })



    
  }),
    
})

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useDeleteAPeoductMutation 
}=productsManagementApi;