<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function toArray(Request $request): array
    {
        $disk = Storage::disk('article');
        return [
            "id" => $this->id,
            "title" => $this->title,
            "content" => $this->content,
            "imagePath" => $this->image_path ? $disk->url($this->image_path) : null,
        ];
    }
}
