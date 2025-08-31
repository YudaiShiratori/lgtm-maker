'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { api } from '~/trpc/react';

interface GeneratedImage {
  imageUrl: string;
  shortUrl: string;
  markdown: string;
  meta: {
    shortId: string;
  };
}

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateMutation = api.lgtm.generate.useMutation({
    onSuccess: (data) => {
      setGeneratedImage(data);
      // Markdown自動コピー
      copyMarkdown(data.markdown);
      toast.success(
        'LGTM画像を生成しました！Markdownもクリップボードにコピーされています。'
      );
    },
    onError: (error) => {
      toast.error(`エラー: ${error.message}`);
    },
  });

  // ファイル選択時の処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 画像ファイルのバリデーション
      if (!file.type.startsWith('image/')) {
        toast.error('画像ファイルを選択してください');
        return;
      }
      setSelectedFile(file);
    }
  };

  // ファイルをbase64に変換
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // dataURLヘッダーを除いた本文のみを返す
        const base64 = result.split(',')[1];
        resolve(base64 || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Markdownクリップボードコピー
  const copyMarkdown = async (markdown: string) => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (_error) {
      // Silent fail for clipboard copy
    }
  };

  // 画像プレビューモーダルを開く
  const openImageModal = () => {
    setShowModal(true);
  };

  // モーダルを閉じる
  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Escキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showModal, closeModal]);

  // LGTM生成実行
  const handleGenerate = async () => {
    if (!(selectedFile || imageUrl.trim())) {
      toast.error('画像ファイルまたはURLを指定してください');
      return;
    }

    try {
      let fileBase64: string | undefined;
      let fileName: string | undefined;
      let url: string | undefined;

      // ファイルアップロード優先
      if (selectedFile) {
        fileBase64 = await fileToBase64(selectedFile);
        fileName = selectedFile.name;
      } else if (imageUrl.trim()) {
        url = imageUrl.trim();
      }

      await generateMutation.mutateAsync({
        fileBase64,
        fileName,
        url,
      });
    } catch (_error) {
      // Error is handled by mutation's onError
    }
  };

  // 入力クリア
  const handleClear = () => {
    setSelectedFile(null);
    setImageUrl('');
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isValid = selectedFile || imageUrl.trim();
  const isLoading = generateMutation.isPending;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 font-bold text-4xl">LGTM Maker</h1>
        <p className="text-muted-foreground">
          画像をアップロードまたはURLを入力して、LGTM画像を生成します
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>画像を選択</CardTitle>
          <CardDescription>
            ファイルをアップロードするか、画像URLを入力してください（ファイル優先）
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* ファイルアップロード */}
          <div className="space-y-2">
            <Label htmlFor="file">ファイルアップロード</Label>
            <Input
              accept="image/*"
              disabled={isLoading}
              id="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              type="file"
            />
          </div>

          {/* URL入力 */}
          <div className="space-y-2">
            <Label htmlFor="url">画像URL（任意）</Label>
            <Input
              disabled={isLoading}
              id="url"
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              type="url"
              value={imageUrl}
            />
          </div>

          {/* ボタン */}
          <div className="flex gap-2">
            <Button
              className="flex-1"
              disabled={!isValid || isLoading}
              onClick={handleGenerate}
            >
              {isLoading ? '生成中...' : '作る'}
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleClear}
              variant="outline"
            >
              クリア
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* プレビュー */}
      {generatedImage && (
        <Card>
          <CardHeader>
            <CardTitle>生成結果</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* プレビュー画像 */}
            <button
              className="w-full cursor-pointer overflow-hidden rounded-lg border-0 bg-transparent p-0"
              onClick={openImageModal}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openImageModal();
                }
              }}
              type="button"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Generated LGTM"
                className="h-auto w-full transition-transform duration-200 hover:scale-105"
                src={generatedImage.imageUrl}
              />
            </button>

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => copyMarkdown(generatedImage.markdown)}
                variant="outline"
              >
                Markdownコピー
              </Button>
            </div>

            {/* Markdown表示 */}
            <div className="space-y-2">
              <Label>Markdown</Label>
              <div className="break-all rounded-md bg-muted p-3 font-mono text-sm">
                {generatedImage.markdown}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 画像拡大モーダル */}
      {showModal && generatedImage && (
        // biome-ignore lint/nursery/noNoninteractiveElementInteractions: モーダル背景クリックで閉じる機能が必要
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={closeModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}
          role="dialog"
          tabIndex={-1}
        >
          <div className="relative max-h-full max-w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Generated LGTM - Full Size"
              className="max-h-full max-w-full object-contain"
              src={generatedImage.imageUrl}
            />
            <button
              className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              onClick={closeModal}
              type="button"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
