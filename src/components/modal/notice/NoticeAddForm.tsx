"use client";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { questionAlert } from "@/utils/alertFns";
import { customFetch } from "@/utils/fetchClient";
import { isAdmin } from "@/utils/noticeFns";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const NoticeAddForm = ({ isEdit }: { isEdit?: boolean }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const pointWord = isEdit ? "수정" : "추가";

  useEffect(() => {
    if (!isAdmin) router.back();
    else if (isEdit && typeof window !== undefined) {
      setTitle(localStorage.getItem("ntl") || "");
      setDescription(localStorage.getItem("nds") || "");
    }
    return () => {
      setTitle("");
      setDescription("");
      if (isEdit) {
        localStorage.removeItem("ntl");
        localStorage.removeItem("nds");
        localStorage.removeItem("ndx");
        localStorage.removeItem("ndt");
      }
    };
  }, []);
  function handleSaveClick() {
    if (title.length > 0 && description.length > 0) {
      const afterEffect = isEdit
        ? () => {
            const id =
              typeof window !== "undefined"
                ? localStorage.getItem("ndx")
                : null;
            if (id) {
              customFetch.put("notice/edit", {
                title,
                description,
                id: Number(id),
              });
            }
          }
        : () => {
            customFetch
              .post("notice/add", {
                title,
                description,
              })
              .then((res) => {
                if (res.body.code !== 0) {
                  throw new Error();
                }
              });
          };
      questionAlert({
        title: `공지사항을 ${pointWord}하시겠습니까?`,
        text: "",
        confirmText: pointWord,
        afterEffect,
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `성공적으로 공지사항을 ${pointWord}하였습니다.`,
              icon: "success",
            }).then(() => {
              router.back();
            });
          }
        })
        .catch((e) => {
          Swal.fire({
            title: `공지사항을 ${pointWord}하지 못했습니다.`,
            icon: "error",
          });
        });
    }
  }
  return (
    <div className="w-full h-full p-1 flex flex-col gap-2">
      <button
        className="mr-2 w-max text-2xl self-end"
        onClick={() => router.back()}
      >
        x
      </button>
      <Input
        type="text"
        label="제목"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        suppressHydrationWarning
      />
      <TextArea
        value={description}
        label="본문"
        handleChange={(e) => setDescription(e.target.value)}
        className="flex-1"
        suppressHydrationWarning
      />
      <button onClick={handleSaveClick} suppressHydrationWarning>
        {pointWord}하기
      </button>
    </div>
  );
};

export default NoticeAddForm;