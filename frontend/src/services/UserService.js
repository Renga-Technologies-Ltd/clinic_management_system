const base_apiUrl = process.env.REACT_APP_BASE_URL;

class UserService {
  // Example endpoint URL
  static BASE_URL = base_apiUrl;

  static async getUserDetails(userId) {
    try {
      const response = await fetch(`${this.BASE_URL}/getUser/${userId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }
      const userData = await response.json();
      console.log(userData);
      return userData;
    } catch (error) {
      console.error("Error in UserService.getUserDetails:", error.message);
      throw error;
    }
  }
}

export default UserService;
