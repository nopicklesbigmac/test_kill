package com.proj.instagram.user;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {
	@Autowired
	private IUserDAO userDao;

	@Override
	public Map<String, Object> joinProc(UserDTO user, Map<String, Object> result) {
		if (userDao.selectemail(user.getEmail()) != null) {
			result.put("code", "이미있는 이메일");
		} else if (userDao.selectuser(user.getUsername()) != null) {
			result.put("code", "이미있는 유저네임");
		} else if (userDao.selectemail(user.getEmail()) == null) {
			userDao.join(user);
			result.put("code", true);
		}
		return result;

	}

	@Override
	public boolean idcheck(UserDTO user) {
		String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		boolean result = user.getEmail().matches(emailRegex);
		// True = email / False = username
		return result;
	}
}
