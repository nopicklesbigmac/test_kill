package com.proj.instagram.post;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostDAO {
    List<PostDTO> findByUserEmail(@Param("email") String email);
    
    void savePost(PostDTO postDTO);

    int getLatestPostId(String email);
    
    void updatePost(PostDTO postDTO);
    
}
