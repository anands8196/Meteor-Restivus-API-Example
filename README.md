# Meteor-Restivus-API-Example
Restivus: API -Get,Post,Put,Delete Methods

#POST Method For Creating a new row

    post: {
      action: function () {

        var email = this.bodyParams.email;
        var name = this.bodyParams.name;
        var age = this.bodyParams.age;
        var location = this.bodyParams.location;

        var check = Users.find({ "email": email }).fetch();

        if (check.length > 0) {
          return {
            statusCode: 206,
            body: {
              status: 'fail',
              message: 'Name already exist'
            }
          }
        }

        else {
          var data = Users.insert({ "email": email, "name": name, "age": age, "location": location })
          return {
            message: "Successfully Inserted",
            data: data
          }
        }
      }
    }

    
  #GET Method for Searching 
  
    get: function () {
      var _id = this.urlParams._id;
      var check = Users.find({ "_id": _id }).fetch();
      if (check.length == 0) {
        return {
          statusCode: 206,
          body: {
            status: 'fail',
            message: 'Invalid ID or ID not exists'
          }
        }
      }
      else {
        return Users.find({ "_id": _id }).fetch();
      }
       return Users.findOne({"id":details});
    }



  #DELETE Method for deleting a row
   
    delete: function () {
      var _id = this.urlParams._id;
      var check = Users.find({ "_id": _id }).fetch();

      if (check.length == 0) {
        return {
          statusCode: 206,
          body: {
            status: 'fail',
            message: 'Invalid ID or ID not exists'
          }
        };
      }

      else {
        Users.remove(_id);
        return {
          message: "deleted",
          status: 'success',
          data: {
            "_id": _id,
          }
        }
      }

    }


  #Put Method : Updating row
  
    put: {
      action: function () {
        var _id = this.urlParams._id;
        var check = Users.find({ "_id": _id }).fetch();

        if (check.length == 0) {
          return {
            statusCode: 206,
            body: {
              status: 'fail',
              message: 'Invalid ID or ID not exists'
            }
          }
        }

        else {
          var email = this.bodyParams.email;
          var name = this.bodyParams.name;
          var age = this.bodyParams.age;
          var location = this.bodyParams.location;
          Users.update({ "_id": _id }, { $set: { "name": name, "email": email, "age": age, "location": location } });
          return {
            message: "Updated",
            status: 'success',
            data: {
              "_id": _id
            }
          }
         }
        }
      }
     
