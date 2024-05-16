interface ResultProps {
  displayText: string;
}

const Result = (props: ResultProps) => {
  return <p>{props.displayText}</p>;
};

export default Result;
