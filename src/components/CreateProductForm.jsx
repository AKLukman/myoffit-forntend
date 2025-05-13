import { useState } from "react";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { toast } from "sonner";
import { useAddProductMutation } from "../redux/features/products/productsManagementApi";


const categories = ["Men","Women","Kids"];
const subCategories = ["Topwear","Botttomwear","Winterwear"];

const CreateProductForm = () => {
	const [addProduct] =useAddProductMutation();
	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		subCategory:"",
		bestSellingProduct:false,
		images: [],
	});

	

const handleSubmit = async (e) => {
  e.preventDefault();
  const productId = toast.loading('Product Creating...');

  try {
    const formData = new FormData();

    // 1. Append data as JSON string
    formData.append('data', JSON.stringify({
      name: newProduct.name,
      description: newProduct.description,
      price: Number(newProduct.price),  // ⚡ convert to number
      category: newProduct.category,
      subCategory: newProduct.subCategory,
	  bestSellingProduct: newProduct.bestSellingProduct
    }));

    // 2. Append each image file
    newProduct.images.forEach((imgFile) => {
      formData.append('files', imgFile); // `files` is field name, as backend expects
    });

    // 3. Call API
    await addProduct(formData);

    toast.success('Product created successfully!', { id: productId, duration: 2000 });

    // 4. Reset form
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      subCategory: "",
      bestSellingProduct: false,
      images: [],
    });

  } catch (error) {
    console.error(error);
    toast.error('Product creating failed. Try again!', { id: productId });
  }
};



	const handleImageChange = (e) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			const fileArray = Array.from(files); 

			setNewProduct(prev => ({
			...prev,
			images: [...prev.images, ...fileArray], 
			}));
		}
	};



	const handleDeleteImage = (index) => {
  		setNewProduct(prev => ({
   			 ...prev,
    		images: prev.images.filter((_, i) => i !== index), // remove the selected image
  		}));
	};


	return (

		<div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
		<h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>

		<form onSubmit={handleSubmit} className='space-y-4'>
			<div>
				<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Product Name
				</label>
				<input
						type='text'
						id='name'
						name='name'
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-emerald-500 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Description
					</label>
					<textarea
						id='description'
						name='description'
						value={newProduct.description}
						onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
						rows='3'
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 
						 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='price' className='block text-sm font-medium text-gray-300'>
						Price
					</label>
					<input
						type='number'
						id='price'
						name='price'
						value={newProduct.price}
						onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						step='0.01'
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm 
						py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500
						 focus:border-emerald-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='category' className='block text-sm font-medium text-gray-300'>
						Category
					</label>
					<select
						id='category'
						name='category'
						value={newProduct.category}
						onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
						required
					>
						<option value=''>Select a category</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

					<div>
					<label htmlFor='category' className='block text-sm font-medium text-gray-300'>
						Category
					</label>
					<select
						id='subCategory'
						name='subCategory'
						value={newProduct.subCategory}
						onChange={(e) => setNewProduct({ ...newProduct, subCategory: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md
						 shadow-sm py-2 px-3 text-white focus:outline-none 
						 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
						required
					>
						<option value=''>Select a sub category</option>
						{subCategories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
			<div className="flex items-center space-x-2">
			<input
				id="bestSellingProduct"
				type="checkbox"
				defaultChecked={newProduct.bestSellingProduct}
				onClick={() => setNewProduct({ ...newProduct, bestSellingProduct: !newProduct.bestSellingProduct })}
				className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-all"
			/>
			<label htmlFor="bestSellingProduct" className="text-sm font-medium text-gray-700">
				This is best selling product
			</label>
			</div>

			<div className="mt-1 flex flex-col items-start gap-3">
				{/* Hidden file input */}
				<input
					type="file"
					id="images"
					className="sr-only"
					accept="image/*"
					required
					multiple
					onChange={handleImageChange}
				/>

				{/* Upload button */}
				<label
					htmlFor="images"
					className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
				>
					<Upload className="h-5 w-5 inline-block mr-2" />
					Upload Images
				</label>

				{/* Preview uploaded images */}
				{newProduct?.images?.length > 0 && (
  <div className="flex flex-wrap gap-3 mt-3">
    {newProduct?.images?.map((img, index) => (
      <div key={index} className="relative group">
        {/* Image preview */}
        <img
          src={URL.createObjectURL(img)}
          alt="Uploaded"
          className="h-20 w-20 object-cover rounded-md border border-gray-500"
        />

        {/* Delete button */}
        <button
          type="button"
          onClick={() => handleDeleteImage(index)}
          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
)}

				</div>


				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
					// disabled={loading}
				>
					{/* {loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : ( */}
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Create Product
						</>
					{/* )} */}
				</button>
			</form>
		</div>
	);
};
export default CreateProductForm;