import octokit from "@/api/github";

const getUserRepositories = async (
  username,
  perPage = 10,
  page = 1,
  sortBy = "full_name",
  direction = "desc"
) => {
  try {
    const response = await octokit.request("GET /users/{username}/repos", {
      username,
      per_page: perPage,
      page: page,
      sort: sortBy,
      direction: direction,
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

    return { data, nextPage };
  } catch (error) {
    console.error("Erro ao buscar repositórios:", error.message || error);
    return { data: [], nextPage: null };
  }
};

export { getUserRepositories };
