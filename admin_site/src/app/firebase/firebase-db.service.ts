import { Injectable } from '@angular/core';

import { firebase } from '.././firebase/firebase-auth.service';
import { Category } from '.././category/category';
import { Product } from '.././product/product';
import { User } from '.././user/user';

@Injectable()
export class FirebaseDBService {
  
  	writeCategoryData(category): Promise<Object> {
	    // Get a key for a new Post.
	    var newCategoryKey = firebase.database().ref().child("categories").push().key;
	    var updates = {};
	    updates["/categories/" + newCategoryKey] = {
	      categoryName: category.categoryName,
	      categoryDesc: category.categoryDesc,
	      categoryId: newCategoryKey
	    };

    	return firebase.database().ref().update(updates);
    };

    writeProductData(product): Promise<Object> {
		var newProductKey = product.productId;
    	//debugger;
    	if (!newProductKey) {
	    	// Get a key for a new Product.
	    	newProductKey = firebase.database().ref().child("products").push().key;
	    }

	    return this.handleFileSelect(newProductKey, product.productImages)
			    .then(function(urls) {
				    var updates = {};
				    if (product.isActive !== 0) {
				    	product.isActive = 1;
				    };

				    updates["/products/" + newProductKey] = {
				      productId: newProductKey,
				      categoryId: product.categoryId,
				      productName: product.productName,
				      productDesc: product.productDesc,
				      productLongDesc: product.productLongDesc,
				      productPrice: product.productPrice,
				      productWeight: product.productWeight,
				      productStatus: product.productStatus,
				      stock: product.stock,
				      productImages: urls.toString(),
				      isActive: product.isActive
				    };
			    	return firebase.database().ref().update(updates);
		    	});
    };


    getAdminUser(isAdmin, email): Promise<User> {
    	var productsRef = firebase.database().ref('Users');
    	return productsRef.orderByChild("isAdmin").equalTo(isAdmin).once("value")
    		.then(function(snapshot) {
			    var user = null;
			    snapshot.forEach(function(item) {
			    	item = item.val();
			    	if (item.email === email) {
			    		user = item;
			    		return true;
			    	}
			    });
			    response => user;
			    return user;
			});
    };

    getAllCategories(): Promise<Category[]> {
    	return firebase.database().ref('categories').once('value')
    	.then(function(snapshot) {
		  var categories = new Array<Category>();
		  snapshot.forEach(function(category) {
		    var category = category.val();
		    categories.push({
				categoryName: category.categoryName,
				categoryDesc: category.categoryDesc,
				categoryId: category.categoryId
		    });
		  });
		  response => categories;
		  return categories;
		});
    };

    getAllProducts(): Promise<Product[]> {
    	return firebase.database().ref('products').once('value')
    	.then(function(snapshot) {
		  var products = new Array<Product>();
		  snapshot.forEach(function(product) {
		    var product = product.val();
		    firebase.database().ref('categories').child(product.categoryId).once('value')
	    	.then(function(snapshot) {
			  	var category = snapshot.val();
			  	if (product.isActive) {
					products.push({
						productId: product.productId,
						categoryId: product.categoryId,
						categoryName: category.categoryName,
						productName: product.productName,
						productDesc: product.productDesc,
						productLongDesc: product.productLongDesc,
					    productPrice: product.productPrice,
					    productWeight: product.productWeight,
					    productStatus: product.productStatus,
					    stock: product.stock,
						productImages: product.productImages,
						isActive: product.isActive
					});
				}
			});
		    
		  });
		  response => products;
		  return products;
		});
    };

    searchProduct(searchText): Promise<Product[]> {
    	var productsRef = firebase.database().ref('products');
    	return new Promise(resolve => {
    		productsRef.orderByChild("productName").equalTo(searchText).on("child_added", function(snapshot) {
	    		var products = new Array<Product>();
			    var product = snapshot.val();
			    firebase.database().ref('categories').child(product.categoryId).once('value')
		    	.then(function(snapshot) {
				  	var category = snapshot.val();
					product.categoryName = category.categoryName;
					products.push(product);
					response => products;
					return products; 
				});
			});
		});
    };

    handleFileSelect(newProductKey, files): Promise<string> {
		var count = 0;
		var urls = [];
		return new Promise(resolve => {
			if (files.length == 0) resolve("");	
			for (var i=0; i<files.length; i++) {
		      var file = files[i];
		      var metadata = {
		        'contentType': file.type
		      };
		      // Push to child path.
		      // [START oncomplete]
		      var storageRef = firebase.storage().ref();

		      storageRef.child('images/products/' + newProductKey + '/' + file.name).put(file, metadata).then(function(snapshot) {
					    //storageRef.child('images').child('products').child(newProductKey).child(file.name).put(file, metadata).then(function(snapshot) {
					    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
					    console.log(snapshot.metadata);
					    var url = snapshot.downloadURL;
				        console.log('File available at', url);
				        // [START_EXCLUDE]
				        //document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
				        // [END_EXCLUDE]

				        count++;
				        urls.push(url);
				        if (count == files.length) {
				        	//callBack(urls);
				        	resolve(urls);
				        }
			      	}).catch(function(error) {
			        	// [START onfailure]
			        	console.error('Upload failed:', error);
			        	// [END onfailure]
			      	});
			      	// [END oncomplete]
		      }; // [END for loop]
	  	});
	}

}