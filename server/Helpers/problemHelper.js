const getProblemNameFromId = (problemId) => {
  return (
    problemId
      ?.split("-")
      .map((str) => {
        const name = str?.[0]?.toUpperCase() + str?.slice(1);

        return name;
      })
      .join(" ") || ""
  );
};

module.exports = {
  getProblemNameFromId,
};
