import Json from './Json'
import EditorUI from './EditorUI'
import Alert from "../components/Alert";

export default function Editor() {
    return (
        <div className="grid grid-cols-2 gap-4 mt-3 relative">
            <div>
                <EditorUI />
                <Alert />
            </div>
            <div>
                <Json />
            </div>
        </div>
    )
}
