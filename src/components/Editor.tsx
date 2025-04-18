import Json from './Json'
import EditorUI from './EditorUI'

export default function Editor() {
    return (
        <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
                <EditorUI />
            </div>
            <div>
                <Json />
            </div>
        </div>
    )
}