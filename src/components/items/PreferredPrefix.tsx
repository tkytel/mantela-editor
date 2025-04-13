import { useImmerAtom } from "jotai-immer";
import { BodyAtom } from "../../helpers/Jotai";
import Creatable from 'react-select/creatable';
import { MultiValue } from 'react-select';

type Option = { value: string; label: string; }

export default function PreferredPrefix() {
    const [json, setJson] = useImmerAtom(BodyAtom);

    // JSON 側から更新された prefix を、react-select/creatable でハンドルできる型に変換する
    const selectedPrefixes: Option[] = (json.data.aboutMe.preferredPrefix || []).map((value: string) => ({
        value,
        label: value,
    }));

    // UI 側から更新された prefix を、react-select/creatable の要素を排除して JSON 側に反映させる
    const handleChange = (selected: MultiValue<Option>) => {
        const values = selected ? selected.map((opt: any) => opt.value) : [];
        setJson((draft) => {
            draft.data.aboutMe.preferredPrefix = values;
        })
    }
    
    return (
        <div className="mb-5">
            <label
                htmlFor="aboutMe.identifier"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                好ましいプレフィックス <span className="text-pink-500">*</span>
            </label>
            <div className="relative w-full">
                <Creatable
                    isClearable
                    isMulti
                    onChange={handleChange}
                    value={selectedPrefixes}
                    placeholder="プレフィックスを入力して、リターンキーを押してください..."
                />
            </div>
        </div>
    )
}