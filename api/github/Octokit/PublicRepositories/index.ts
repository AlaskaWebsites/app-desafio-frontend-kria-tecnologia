import octokit from "@/api/github";

const getPublicRepositories = async (perPage = 10, since = 0) => {
  try {
    const response = await octokit.request("GET /repositories", {
      per_page: perPage,
      since,
    });

    if (response.status !== 200) {
      throw new Error("Falha na resposta da API");
    }

    const data = response.data.slice(0, perPage);

    return {
      data,
      nextSince: data.length > 0 ? data[data.length - 1]?.id || null : null,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar repositórios:", error.message);
    } else {
      console.error("Erro ao buscar repositórios:", error);
    }
    return { data: [], nextSince: null };
  }
};

export { getPublicRepositories };
