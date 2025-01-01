import BookDetail from "@/components/client/book/book.detail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
function BookPage() {
  let { id } = useParams();
  useEffect(() => {
    if (id) {
      //do something
      console.log("book id = ", id);
    }
  }, [id]);
  return (
    <div>
      <BookDetail />
    </div>
  );
}

export default BookPage;
