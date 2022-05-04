function User() {
  // Private variable
  var name;

  // Private method
  var privateMethod = function(){
    // Access to private fields
    name += " Changed";
  };

  return {
  a : 5,
    // Public methods
    setName: function(newName) {
      name = newName;
      privateMethod();
    },
    getName: function() {
      return name;
    }
  };
}
