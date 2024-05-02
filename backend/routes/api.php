<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Protected Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/logout', [AuthController::class, 'logout']);
    // Users
    Route::prefix('user')->controller(AuthController::class)->group(function () {
        Route::get('show', 'getAll');
        Route::get('showbyid/{id}', 'getbyId');
        Route::post('update/{id}', 'updateUser');
        Route::post('create', 'register');
        Route::delete('delete/{user_id}', 'remove');
    });
   
});


// Public Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

route::post('/api/userAdd', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");

        // Use prepared statements to avoid SQL injection
        $stmt = mysqli_prepare($conn, "INSERT INTO user (Username, Password, Type) VALUES (?, ?, ?)");
        mysqli_stmt_bind_param($stmt, "sss", $_POST['name'], $_POST['password'], $_POST['type']);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        mysqli_close($conn);
        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/userDel/{id}', function ($id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from user where id={$id};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/userUp/{dataID}/{value1}/{value2}/{value3}', function ($dataID, $value1, $value2, $value3) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "UPDATE user
        SET Username = {$value1}, Password= {$value2},Type = {$value3}
        WHERE id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/userGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from user;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/userGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from user where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::get('/userGetBy/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select Name from user where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::get('/depositGetBy/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select Name from deposit where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::post('/product_fact_Add', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $prod = $data['prod'];
        $price = $data['price'];
        $qte = $data['qte'];
        $tva = $data['tva'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO product_fact (Id_Prod, Product_Price, Product_Qte, TVA) VALUES ('$prod', '$price', '$qte', '$tva')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});

route::get('/product_factDel/{dataID1}/{dataID2}', function ($dataID1, $dataID2) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from product_fact where Id_Fact={$dataID1} and Id_Prod={$dataID2};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/product_factUp/{dataID1}', function ($dataID1) {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $value1 = $data['value1'];
        $value2 = $data['value2'];
        $value3 = $data['value3'];
        $value4 = $data['value4'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE product_fact
                  SET Product_Price = '$value1', 
                      Product_Qte = '$value2',
                      TVA = '$value3',
                      Id_Prod = '$value4'
                  WHERE Id_Fact = '$dataID1'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});

route::get('/product_factGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from product_fact;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/product_factGet/{Id1}', function ($Id1) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from product_fact where Id_Fact={$Id1}");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::post('/productAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['barcode'];
        $Value2 = $data['ref'];
        $Value3 = $data['name'];
        $Value4 = $data['buy'];
        $Value5 = $data['sell'];
        $Value6 = $data['amount'];
        $Value7 = ""; // Set photo to an empty string
        $Value8 = $data['group'];
        $Value9 = $data['deposit'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO product (Bar_Code, Reference, Name, Buying_Price, Selling_Price, Stock, Photo, Id_Groupe, Id_Deposit) VALUES ('$Value1', '$Value2', '$Value3', '$Value4', '$Value5', '$Value6', '$Value7', '$Value8', '$Value9')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});

route::get('/productDel/{id}', function ($id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from product where id={$id};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/productUp/{dataID}', function ($dataID) {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['barcode'];
        $Value2 = $data['ref'];
        $Value3 = $data['name'];
        $Value4 = $data['buy'];
        $Value5 = $data['sell'];
        $Value6 = $data['amount'];
        $Value7 = ""; 
        $Value8 = $data['group'];
        $Value9 = $data['deposit'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE product
                  SET Bar_Code='{$Value1}', Reference='{$Value2}', Name='{$Value3}', Buying_Price='{$Value4}', Selling_Price='{$Value5}', Stock='{$Value6}', Photo='{$Value7}', Id_Groupe='{$Value8}', Id_Deposit='{$Value9}'
                  WHERE id='{$dataID}'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/productGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from product;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/productGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from product where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/bondelivraisonAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['date'];
        $Value2 = $data['oldreste'];
        $Value3 = $data['reste'];
        $Value4 = $data['payment'];
        $Value5 = $data['client'];
        $Value6 = $data['user'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO bondelivraison (Date, Old_Reste, Reste, Payment, Id_Client, Id_User) VALUES ('$Value1', '$Value2', '$Value3', '$Value4', '$Value5', '$Value6')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});

route::get('/bondelivraisonDel/{dataID}', function ($dataID) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from bondelivraison where id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/bondelivraisonUp/{dataID}', function ($dataID) {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['date'];
        $Value2 = $data['oldreste'];
        $Value3 = $data['reste'];
        $Value4 = $data['payment'];
        $Value5 = $data['client'];
        $Value6 = $data['user'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE bondelivraison
                  SET Date='$Value1', 
                      Old_Reste='$Value2', 
                      Reste='$Value3', 
                      Payment='$Value4', 
                      Id_Client='$Value5', 
                      Id_User='$Value6'
                  WHERE id='$dataID'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/bondelivraisonGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from bondelivraison;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/bondelivraisonGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from bondelivraison where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/groupeAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['name'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO groupe (Name) VALUES ('$Value1')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/groupeDel/{dataID}', function ($dataID) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from groupe where id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/groupeUp/{dataID}', function ($dataID) {
    try {
        
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['name'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE groupe
                  SET Name='$Value1'
                  WHERE id='$dataID'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/groupetGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from groupe;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/groupeGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from groupe where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::post('/factureAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['date'];
        $Value2 = $data['client'];
        $Value3 = $data['seller'];
        $Value4 = $data['payment'];
        $Value5 = $data['reste'];
        $Value6 = $data['sold'];
        $Value7 = $data['type'];
        $Value8 = $data['upDate'];
        $Value9 = $data['upTime'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO facture (Date, Id_Client, Id_Seller, Payment, Reste, Solde, Type, Update_Date, Update_Time) VALUES ('$Value1', '$Value2', '$Value3', '$Value4', '$Value5', '$Value6', '$Value7', '$Value8', '$Value9')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/factureDel/{dataID}', function ($dataID) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from facture where id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::post('/factureUp/{dataID}', function ($dataID) {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['date'];
        $Value2 = $data['client'];
        $Value3 = $data['seller'];
        $Value4 = $data['payment'];
        $Value5 = $data['reste'];
        $Value6 = $data['sold'];
        $Value7 = $data['type'];
        $Value8 = $data['upDate'];
        $Value9 = $data['upTime'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE facture
                  SET Date='$Value1', 
                      Id_Client='$Value2', 
                      Id_Seller='$Value3', 
                      Payment='$Value4', 
                      Reste='$Value5', 
                      Solde='$Value6', 
                      Type='$Value7', 
                      Update_Date='$Value8', 
                      Update_Time='$Value9'
                  WHERE id='$dataID'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/factureGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from facture;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/factureGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from facture where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::post('/depositAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['name'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO deposit (Name) VALUES ('$Value1')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});

route::get('/depositDel/{dataID}', function ($dataID) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from deposit where id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
route::post('/depositUp/{dataID}', function ($dataID) {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);
        $Value1 = $data['name'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE deposit
                  SET Name='$Value1'
                  WHERE id='$dataID'";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/depositGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from deposit;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/depositGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from deposit where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

// Change the route method to POST
api :route::post('/clientAdd', function () {
    try {
        // Retrieve data from the request body
        $data = json_decode(file_get_contents("php://input"), true);

        // Extract data
        $Value1 = $data['name'];
        $Value2 = $data['phone'];
        $Value3 = $data['adresse'];
        $Value4 = $data['sold'];
        $Value5 = $data['reste'];
        $Value6 = $data['paid'];
        $Value7 = $data['credit'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "INSERT INTO client (Name, Phone_Number, Address, Sold_Total, Reste, Paid, Credit) VALUES ('$Value1', '$Value2', '$Value3', '$Value4', '$Value5', '$Value6', '$Value7')";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/clientDel/{dataID}', function ($dataID) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "delete from client where id={$dataID};");
        mysqli_close($conn);
        return response("Done");
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});


route::post('/clientUp/{dataID}', function ($dataID) {
    try {
        
        $data = json_decode(file_get_contents("php://input"), true);

        // Extract data
        $Value1 = $data['name'];
        $Value2 = $data['phone'];
        $Value3 = $data['adresse'];
        $Value4 = $data['sold'];
        $Value5 = $data['reste'];
        $Value6 = $data['paid'];
        $Value7 = $data['credit'];

        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $query = "UPDATE client 
                  SET Name='$Value1', 
                      Phone_Number='$Value2', 
                      Address='$Value3', 
                      Sold_Total='$Value4', 
                      Reste='$Value5', 
                      Paid='$Value6', 
                      Credit='$Value7' 
                  WHERE id=$dataID";
        $result = mysqli_query($conn, $query);
        mysqli_close($conn);

        return response("Done");
    } catch (Exception $e) {
        return response("Oops, something went wrong", 404);
    }
});


route::get('/clientGetAll', function () {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from client;");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});

route::get('/clientGet/{Id}', function ($Id) {
    try {
        $conn = mysqli_connect('127.0.0.1:3306', "root", "", "back_end");
        $data = mysqli_query($conn, "select * from client where id={$Id};");
        $help = $data->fetch_all(MYSQLI_ASSOC);
        mysqli_close($conn);
        return response($help);
    } catch (Exception) {
        return response("oops, something went wrong", 404);
    }
});
