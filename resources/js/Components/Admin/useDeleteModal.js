// utils/useDeleteModal.js
import Swal from "sweetalert2";
import axios from "axios";

export const useDeleteModal = async (id, routeName, onSuccess) => {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(route(routeName, id));
            Swal.fire("Deleted!", "The item has been deleted.", "success");
            onSuccess(); // callback after successful deletion
        } catch (error) {
            console.error("Error deleting item:", error);
            Swal.fire("Error!", "Something went wrong.", "error");
        }
    }
};
