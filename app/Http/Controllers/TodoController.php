<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index()
    {
        $todos = Todo::where('user_id', auth()->id())
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'data' => $todos
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'descriptions' => 'nullable|string',
        ], [
            'title.required' => 'Title wajib diisi.',
            'title.string' => 'Title harus berupa text.',
            'title.max' => 'Title maksimal 255 karakter.',
            'descriptions.string' => 'Description harus berupa text.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo = Todo::create([
            'title' => $request->title,
            'descriptions' => $request->descriptions ?? null,
            'user_id' => auth()->id(),
            'is_done' => false
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Todo berhasil dibuat',
            'data' => $todo
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$todo) {
            return response()->json([
                'status' => false,
                'message' => 'Todo tidak ditemukan'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'descriptions' => 'nullable|string',
            'is_done' => 'boolean'
        ], [
            'title.required' => 'Title tidak boleh kosong.',
            'is_done.boolean' => 'is_done harus bernilai true atau false.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $validator->errors()
            ], 422);
        }

        $todo->update($request->only([
            'title',
            'descriptions',
            'is_done'
        ]));

        return response()->json([
            'status' => true,
            'message' => 'Todo berhasil diperbarui',
            'data' => $todo
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$todo) {
            return response()->json([
                'status' => false,
                'message' => 'Todo tidak ditemukan'
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'status' => true,
            'message' => 'Todo berhasil dihapus'
        ]);
    }
}
