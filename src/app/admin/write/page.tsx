import { Editor } from "@/components/admin/Editor";

export default function WritePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-xl font-serif font-bold text-espresso">New Entry</h1>
            <Editor />
        </div>
    );
}
