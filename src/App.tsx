import { useState } from "react";
import { ContentContainer } from "./components/ContentContainer";
import Button from "./components/Button";
import { getStarredRepos, getUser, getUserRepos } from "./service/api";
import type { IUser, IUserRepos } from "./interfaces/iUser";

function App() {
  const [user, setUser] = useState<string>("");
  const [userData, setUserData] = useState<IUser>();
  const [userRepositoriesData, setUserRepositoriesData] = useState<
    IUserRepos[]
  >([]);
  const [isDisabledAllRepos, setIsDisabledAllRepos] = useState<boolean>(true);
  const [isDisabledStarredRepos, setIsDisabledStarredRepos] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchUser = async () => {
    setLoading(true);
    if (userRepositoriesData) setUserRepositoriesData([]);
    if (user) {
      getUser(user)
        .then((data) => {
          setUserData(data);
          setIsDisabledAllRepos(false);
          setIsDisabledStarredRepos(false);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  const handleSearchUserRepos = async () => {
    setUserRepositoriesData([]);
    setLoading(true);
    if (userData) {
      getUserRepos((await userData).login)
        .then((data) => {
          setUserRepositoriesData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user repos:", error);
        });
    }
  };

  const handleSearchUserStarredRepos = async () => {
    setUserRepositoriesData([]);
    setLoading(true);
    if (userData) {
      getStarredRepos((await userData).login)
        .then((data) => {
          setUserRepositoriesData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user starred repos:", error);
        });
    }
  };

  return (
    <div className="bg-gray-300  h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl text-slate-700">Github Search</h1>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-slate-800 h-12 w-12 mb-4"></div>
          <h2>Carregando...</h2>
        </div>
      )}
      <div className="flex flex-row gap-10 items-center h-auto max-h-screen mt-10">
        <ContentContainer orientation="col">
          <h2>Buscar Usuário</h2>
          <input
            type="text"
            className=" border border-gray-400 rounded-md p-2 mb-4 w-full outline-none focus:border-slate-800"
            placeholder="Digite o nome do usuário"
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          <Button variant="primary" onClick={handleSearchUser}>
            Buscar
          </Button>
        </ContentContainer>
        <ContentContainer orientation="col">
          <h2>Buscar repositórios do Usuário: {userData && userData.login}</h2>
          <ContentContainer
            orientation="row"
            className="flex flex-row p-0 h-fit w-11/12 mx-0"
          >
            <Button
              variant="secondary"
              onClick={handleSearchUserRepos}
              disabled={isDisabledAllRepos}
            >
              Todos
            </Button>
            <Button
              variant="tertiary"
              onClick={handleSearchUserStarredRepos}
              disabled={isDisabledStarredRepos}
            >
              Com estrelas
            </Button>
          </ContentContainer>

          {userRepositoriesData ? (
            userRepositoriesData.map((repo) => (
              <div
                key={repo.id}
                className="flex flex-col gap-2 border border-gray-400 rounded-md p-2 mb-4 w-full outline-none focus:border-slate-800"
              >
                <h3>{repo.name}</h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Acessar repositório
                </a>
              </div>
            ))
          ) : (
            <div className="flex flex-col shadow-xl text-center gap-2 p-2 mb-4 w-full outline-none focus:border-slate-800">
              <h3 className="text-red-500">Nenhum repositório encontrado</h3>
            </div>
          )}
        </ContentContainer>
      </div>
    </div>
  );
}

export default App;
