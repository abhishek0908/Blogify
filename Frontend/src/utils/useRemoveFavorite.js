const useRemoveFavorite = async(id) => {
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:3000/removefromlist/${id}`, {
        method: "PUT",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to remove from favorites");
      }
      return response.json();  
};

export default useRemoveFavorite;
