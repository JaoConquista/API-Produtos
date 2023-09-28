
export async function get() {
    return {
      path: "/produtos",
      method: "GET",
      handler: (request, headers) => {
        try {
          return this.db.read();
        } catch (error) {
          console.log("DEU RUIM", error);
          return "Erro interno no servidor";
        }
      },
    };
}