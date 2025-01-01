import BookDetail from "@/components/client/book/book.detail";
import { getBookByIdAPI } from "@/services/api";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function BookPage() {
  let { id } = useParams();
  const { notification } = App.useApp();
  const [currentBook, setCurrentBook] = useState<IBookTable | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBookById = async () => {
        const res = await getBookByIdAPI(id);
        if (res && res.data) {
          setCurrentBook(res.data);
        } else {
          notification.error({
            message: "Đã có lỗi xảy ra",
            description: res.message,
          });
        }
      };
      fetchBookById();
    }
  }, [id]);
  return (
    <div>
      <BookDetail
        currentBook={currentBook}
         />
    </div>
  );
}

export default BookPage;
