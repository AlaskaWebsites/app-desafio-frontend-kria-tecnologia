import octokit from "@/api/github";

interface optionsIssues {
  owner: string;
  repo: string;
}

const getIssues = async (option: optionsIssues) => {
  try {
    return await octokit.request(
      `GET /repos/${option.owner}/${option.repo}/issues`,
      {
        per_page: 10,
      }
    );
  } catch (error) {
    console.error("Erro ao buscar issues:", error);
    return null;
  }
};

export { getIssues };
