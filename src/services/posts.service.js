import { PostsRepository } from '../repositories/posts.repository.js';

export class PostsService {
  // PostsRepository 인스턴스화 시킨다.
  postsRepository = new PostsRepository();

  /* 게시글 조회 API */
  findAllPosts = async () => {
    const posts = await this.postsRepository.findAllPosts();

    // 게시글을 생성 날짜로부터 내림차순 정렬
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // password, content를 뺀 상태로, Controller에게 Response를 전달한다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  /* 게시글 상세 조회 API */
  findPostById = async (postId) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };

  /* 게시글 생성 API */
  createPost = async (nickname, password, title, content) => {
    const createdPost = await this.postsRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  /* 게시글 수정 API */
  updatePost = async (postId, password, title, content) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.postsRepository.updatePost(postId, password, title, content);

    // 변경된 데이터를 조회합니다.
    const updatedPost = await this.postsRepository.findPostById(postId);

    return {
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  /* 게시글 삭제 API */
  deletePost = async (postId, password) => {
    // 저장소(Repository)에게 특정 게시글 하나를 요청합니다.
    const post = await this.postsRepository.findPostById(postId);
    if (!post) throw new Error('존재하지 않는 게시글입니다.');

    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.postsRepository.deletePost(postId, password);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
