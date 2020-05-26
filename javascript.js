function lotto(givenCode) {
  if (givenCode === lucknumber) {
    console.log(chalk.green("congratulations! you are a lucky winner"));
    return true;
  }
  console.log(chalk.red("oops! try again"));
}
