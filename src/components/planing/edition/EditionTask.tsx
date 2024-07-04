import { useTasks } from "@/state/task/taskAtom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EditionTask() {
  const tasks = useTasks("stories");
  return (
    <div className="absolute bottom-0 w-full p-5 bg-white flex flex-row">
      <div className="flex-1"></div>
      <ul className="flex flex-col gap-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex flex-row items-center gap-2 select-none">
            <FontAwesomeIcon icon={faSpinner} className="text-xs text-red-500 animate-spin" />
            <span className="text-xs italic">{task.desc} </span>
            <span></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
