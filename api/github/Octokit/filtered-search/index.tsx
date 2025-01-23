import octokit from "@/api/github";

const searchRepositories = async (
  query: string, // Nome ou parte do nome do repositório
  perPage = 10,
  page = 1,
  sortBy: "stars" | "updated" | "forks" | "help-wanted-issues" = "stars", // Ou outro critério como "updated"
  direction: "desc" | "asc" = "desc"
) => {
  try {
    const response = await octokit.request("GET /search/repositories", {
      q: `in:name ${query}`, // Filtra pela parte do nome do repositório
      per_page: perPage,
      page: page,
      sort: sortBy,
      order: direction,
    });

    if (response.status !== 200) {
      throw new Error("Falha na resposta da API");
    }

    const data = response.data;

    // Verifica o cabeçalho 'link' para determinar a próxima página
    const linkHeader = response.headers.link;
    let nextPage = null;

    if (linkHeader) {
      const nextPageUrl = linkHeader.match(/<([^>]+)>; rel="next"/);
      if (nextPageUrl) {
        nextPage = new URL(nextPageUrl[1]).searchParams.get("page");
      }
    }

    return { data: data.items, nextPage };
  } catch (error) {
    if (error instanceof Error) {
      console.error("Erro ao buscar repositórios:", error.message);
    } else {
      console.error("Erro ao buscar repositórios:", error);
    }
    return { data: [], nextPage: null };
  }
};

export { searchRepositories };
