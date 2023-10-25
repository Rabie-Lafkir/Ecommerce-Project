const validateUserInput = (req, res) => {
    const { userName, firstName, lastName, email } = req.body;
    const errors = []
    // Regular expression for validating email format
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  
    // Regular expression for validating usernames
    const userNameRegex = /^[a-zA-Z0-9_]{3,20}$/; // Allows letters, numbers, and underscores, length between 3 and 20 characters
  
    // Check if email is in the correct format
    if (!emailRegex.test(email)) {
      errors.push({ error: "Invalid email format" });
    }
  
    // Regular expressions for validating first name and last name
    const nameRegex = /^[A-Za-z]+$/;
  
    // Check if first name and last name contain only alphabetic characters
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      errors.push({ error: "First name and last name must not contain numbers or special characters" });
    }
  
    // Check if username matches the regex pattern
    if (!userNameRegex.test(userName)) {
      errors.push({ error: "Invalid username format. It must be between 3 and 20 characters, and can only contain letters, numbers, and underscores." });
    }

    if(errors.length > 0){
      res.status(400).json(errors)
    }
  
    
  };


  module.exports = validateUserInput;
  