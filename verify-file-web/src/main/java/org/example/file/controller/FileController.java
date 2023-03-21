package org.example.file.controller;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.apache.tika.exception.TikaException;
import org.example.file.common.CompareCode;
import org.example.file.common.ResponseCode;
import org.example.file.model.Article;
import org.example.file.model.CompareReport;
import org.example.file.model.CompareTask;
import org.example.file.utils.TextUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * @program: FileController
 * @description: 文件web的controller层
 **/
@Slf4j
@Controller
public class FileController {

    /**
     * 跳转首页
     * @param model
     * @return
     */
    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("result", ResponseCode.SUCCESS);
        return "index";
    }

    /**
     * 上传指定文件
     * @param file1
     * @param file2
     * @param model
     * @return
     */
    @PostMapping("/upload-file")
    public String upload(@RequestParam("file1") MultipartFile file1, @RequestParam("file2") MultipartFile file2, Model model) {
        // map用于存储返回前端展示的数据
        Map<String, String> map = new HashMap<>();
        try {
            if (!file1.isEmpty() && !file2.isEmpty()) {
                Article a1 = TextUtil.getArticle(file1);
                Article a2 = TextUtil.getArticle(file2);

                // 执行文件比较的任务方法
                CompareTask task = new CompareTask(a1, a2);
                task.execute();
                // 获取两个文件的相似度，给出建议
                CompareReport report = task.getCompareReport();
                String s = report.toString();
                int i = report.getDetail();

                // 根据文件相似度，返回给前端对应的提示信息
                if (i == CompareCode.ALL_SAME.getCompareCode()) {
                    map.put("message", String.valueOf(CompareCode.ALL_SAME.getMessage()));
                } else if (i >= CompareCode.PART_SAME.getCompareCode()) {
                    map.put("message", String.valueOf(CompareCode.PART_SAME.getMessage()));
                } else if (i >= CompareCode.HALF_SAME.getCompareCode()) {
                    map.put("message", String.valueOf(CompareCode.HALF_SAME.getMessage()));
                } else {
                    map.put("message", String.valueOf(CompareCode.NOT_SAME.getMessage()));
                }
                map.put("name1", file1.getOriginalFilename());
                map.put("name2", file2.getOriginalFilename());
                map.put("percent", String.valueOf(i));
                log.info("[{}]文件和[{}]文件相似度比对结果: {}", file1.getOriginalFilename(), file2.getOriginalFilename(), s);
                model.addAttribute("result", map);
            } else {
                log.error("文件上传数量错误！");
                model.addAttribute("result", ResponseCode.FILE_NUM_ERROR);
                return "index";
            }
        } catch (IOException | TikaException e) {
            log.error(e.getMessage());
            model.addAttribute("result", ResponseCode.UNKNOW_EXCEPTION);
            return "index";
        }
        return "result";
    }

    @PostMapping("/upload-multi-files")
    public String readPath(@RequestParam("path") String path, Model model) {
        Map<String, String> map = new HashMap<>();
        try {
            // 首先判断输入的文件路径是否为空
            if (StringUtils.isNotEmpty(path)) {
                File file = new File(path);

                // 后端展示读取的文件路径
                if (file.isDirectory()) {
                    log.info("读取文件目录：{}", path);
                }
                int maxRate = Integer.MIN_VALUE;
                String fileName1 = "";
                String fileName2 = "";
                File[] files = file.listFiles();

                // 校验文件路径，只有存储该路径，才会读取其中的文件
                if (Objects.nonNull(files)) {
                    // 利用双层循环，依次比较文件内容
                    for(int i = 0; i < files.length - 1; i++) {
                        if (files[i].isDirectory()) {
                            // 如果是文件夹，则跳过
                            continue;
                        }
                        for(int j = i + 1; j < files.length; j++) {
                            if (files[j].isDirectory()) {
                                // 如果是文件夹，则跳过
                                continue;
                            }
                            Article a1 = TextUtil.getArticle(files[i]);
                            Article a2 = TextUtil.getArticle(files[j]);
                            CompareTask task = new CompareTask(a1, a2);
                            task.execute();
                            // 获取两个文件的相似度，给出建议
                            CompareReport report = task.getCompareReport();
                            // 记录文件相似程度最高的两个文件名和文本相似度
                            if (report.getDetail() > maxRate) {
                                maxRate = report.getDetail();
                                fileName1 = files[i].getAbsolutePath();
                                fileName2 = files[j].getAbsolutePath();
                            }
                        }
                    }

                    // 根据文件相似度，返回给前端对应的提示信息
                    if (maxRate == CompareCode.ALL_SAME.getCompareCode()) {
                        map.put("message", String.valueOf(CompareCode.ALL_SAME.getMessage()));
                    } else if (maxRate >= CompareCode.PART_SAME.getCompareCode()) {
                        map.put("message", String.valueOf(CompareCode.PART_SAME.getMessage()));
                    } else if (maxRate >= CompareCode.HALF_SAME.getCompareCode()) {
                        map.put("message", String.valueOf(CompareCode.HALF_SAME.getMessage()));
                    } else {
                        map.put("message", String.valueOf(CompareCode.NOT_SAME.getMessage()));
                    }
                    map.put("name1", fileName1);
                    map.put("name2", fileName2);
                    map.put("percent", String.valueOf(maxRate));
                    log.info("[{}]文件和[{}]文件相似度比对结果: {}%", fileName1, fileName2, maxRate);
                    model.addAttribute("result", map);

                } else {
                    log.error("此路径下没有文件！");
                    model.addAttribute("result", ResponseCode.FILE_NOT_FOUND);
                    return "index";
                }
            } else {
                log.error("文件路径校验失败！");
                model.addAttribute("result", ResponseCode.FILE_VERIFY_ERROR);
                return "index";
            }
        } catch (IOException | TikaException e) {
            log.error(e.getMessage());
            model.addAttribute("result", ResponseCode.UNKNOW_EXCEPTION);
            return "index";
        }
        return "result";
    }

    @PostMapping("/delete")
    public String delete(@RequestParam("file") String file, Model model) {
        File abFile = new File(file);
        if (abFile.exists()) {
            abFile.delete();
            log.info("删除文件：{}", file);
            model.addAttribute("result", ResponseCode.SUCCESS);
        } else {
            log.error("未找到文件！");
            model.addAttribute("result", ResponseCode.FILE_NOT_FOUND);
        }

        return "forward:/";
    }


}
