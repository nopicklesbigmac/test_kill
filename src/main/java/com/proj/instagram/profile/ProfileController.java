package com.proj.instagram.profile;

import com.proj.instagram.user.IUserDAO;
import com.proj.instagram.user.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ProfileController {

    @Autowired
    private IProfileService profileService;
    @Autowired
    private IUserDAO userDAO;

    @GetMapping("/profile")
    public String profile(Model model, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("user");

        if (user == null) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        return "views/home/profile";
    }

    @GetMapping("/editProfile")
    public String editProfile(Model model, HttpSession session) {
        UserDTO user = (UserDTO) session.getAttribute("user");

        if (user == null) {
            return "redirect:/login";
        }

        model.addAttribute("user", user);
        System.out.println("ProfileController : editProfile");
        return "views/home/editProfile";
    }

    @PostMapping("/editProfile") // URL을 editProfile로 변경
    public String updateProfile(
    	@RequestParam(value = "comments", defaultValue = "") String comments,
        @RequestParam(value = "use_profile_img", required = false) MultipartFile use_profile_img,
        HttpSession session, Model model) {

        UserDTO user = (UserDTO) session.getAttribute("user");

        if (user == null) {
            System.out.println("ProfileController : updateProfile");
            return "redirect:/login"; // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
        }
     // 로그 출력
        System.out.println("Received comments: " + comments);
        boolean updateSuccess = profileService.updateProfile(user, comments, use_profile_img);

        if (updateSuccess) {
            user.setComments(comments);
            session.setAttribute("user", user);
            model.addAttribute("message", "프로필이 성공적으로 업데이트되었습니다.");
        } else {
            model.addAttribute("message", "프로필 업데이트 중 오류가 발생했습니다.");
        }

        // 업데이트 후 사용자 정보와 함께 프로필 페이지로 리다이렉트
        return "redirect:/profile";
    }

}
