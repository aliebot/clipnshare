export default function Comment() {
  return (
    <div>
      <h1 className="flex items-center justify-center mt-20 font-bold">*** Coming Soon ***</h1>
      <div className="rounded-lg bg-gray-200 mt-2 w-full opacity-50">
        <form action="" className="w-full p-4">
          <div className="mb-2">
            <label htmlFor="comment" className="text-lg text-black">
              Add a comment
            </label>
            <textarea
              disabled
              className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1 hover:cursor-not-allowed"
              name="comment"
              placeholder=""
            ></textarea>
          </div>
          <div>
            <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded mr-4 hover:cursor-not-allowed" onClick={(e)=> e.preventDefault()}>
              Comment
            </button>
            <button className="px-3 py-2 text-sm text-blue-600 border border-blue-500 rounded hover:cursor-not-allowed" onClick={(e)=> e.preventDefault()}>
              Cancel
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
