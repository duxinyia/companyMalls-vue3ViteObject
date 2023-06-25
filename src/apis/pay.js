import httpInstance from "@/utils/http.js";
export function getOrderAPI(id) {
  return httpInstance({
    url: `/member/order/${id}`,
  });
}
