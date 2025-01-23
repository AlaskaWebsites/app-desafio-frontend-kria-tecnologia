import octokit from "@/api/github";

interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  // Adicione outras propriedades conforme necessário
}

interface ResponseData {
  data: Repository[];
  nextPage: string | null;
}

const parseLinkHeader = (linkHeader: string): string | null => {
  const nextPageUrl = linkHeader.match(/<([^>]+)>; rel="next"/);
  return nextPageUrl ? new URL(nextPageUrl[1]).searchParams.get("page") : null;
};

const getUserRepositories = async (
  username: string,
  perPage: number = 10,
  page: number = 1,
  sortBy: "full_name" | "updated" | "created" | "pushed" = "full_name",
  direction: "asc" | "desc" = "desc"
): Promise<ResponseData> => {
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

    const data: Repository[] = response.data;
    const linkHeader: string | undefined = response.headers.link;
    const nextPage: string | null = linkHeader
      ? parseLinkHeader(linkHeader)
      : null;

    return { data, nextPage };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erro ao buscar repositórios:", error.message);
    } else {
      console.error("Erro desconhecido ao buscar repositórios:", error);
    }
    return { data: [], nextPage: null };
  }
};

export { getUserRepositories };
