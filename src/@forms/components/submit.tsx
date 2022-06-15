export type SubmitProps = {
  label: string;
}

export function Submit(props: SubmitProps) {

  return (
    <button className="button" type="submit">
      {props.label}
    </button>
  );
}
