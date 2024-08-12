import NoticeAddForm from "@/components/modal/notice/NoticeAddForm";
import LikeModalView from "../../LikeModalView";

export default function NoticeEditPage() {
  return (
    <LikeModalView>
      <NoticeAddForm isEdit />
    </LikeModalView>
  );
}