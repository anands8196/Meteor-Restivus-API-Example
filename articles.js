Articles = new Mongo.Collection('articles');
Users = new Mongo.Collection('Users');//Db

if (Meteor.isServer) {

  // Global API configuration
  var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    apiPath: 'api/',
    version: 'v1'
  });



  Api.addRoute('users', { authRequired: false }, {
    //insert one
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
          //Users.insert(data);

          //Articles.update({"name":"anand"},{$set:{age:22}});
          //var details=this.urlParams.id;
          //return Users.find().fetch().sort({"name":-1});
          //return Articles.findOne(details);
          return {
            message: "Successfully Inserted",
            data: data
          }
        }
      }
    },

    //getAll
    get: function () {
      return Users.find().fetch().sort({ "name": -1 });
    }
  });


  Api.addRoute('users/:_id', { authRequired: false }, {

    //getone
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
      //return Users.findOne({"id":details});

    },



    //delete one
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

    },


    //update 
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
          //details = this.urlParams.id;
          //return Users.find({ "_id": _id }).fetch();
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
  });

}