const useAddFavorite = async(id) => {

      console.log("Yes, it's working");
      const token = sessionStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:3000/addtofavorite/${id}`, {
        method: "POST",
        headers: {
          'Authorization': `${token}`,
          'Content-Type': "application/json",
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to add to favorites");
      }
      
};

export default useAddFavorite;
