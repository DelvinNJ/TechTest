<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Requests\StoreArticle;
use Spatie\QueryBuilder\QueryBuilder;
use App\Http\Resources\ArticleResource;
use Illuminate\Support\Facades\Storage;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = QueryBuilder::for(Article::class)
            ->allowedFilters(['title'])
            ->paginate();

        return ArticleResource::collection($data->withQueryString());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreArticle $request)
    {
        $data = $request->all();
        $image = $request->file('image_path') ?? null;
        if ($image) {
            $uniqueFileName = uniqid() . '_' . $image->getClientOriginalName();
            $disk = Storage::disk('article');
            $disk->put($uniqueFileName, file_get_contents($image));
            $data['image_path'] = $uniqueFileName;
        }
        $article = Article::create($data);
        return new ArticleResource($article);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        return new ArticleResource($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $data = $request->all();
        $article->update($data);
        return new ArticleResource($article->refresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return response([
            'message' => 'Successful operation'
        ], 200);
    }
}
