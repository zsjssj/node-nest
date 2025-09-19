import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Sse, Res, Query, UploadedFiles, HttpStatus, MessageEvent, UseInterceptors } from '@nestjs/common';
import { GsAppService } from './gs_app.service';
import { CreateGsAppDto } from './dto/create-gs_app.dto';
import { UpdateGsAppDto } from './dto/update-gs_app.dto';
import { Request, Response } from 'express'; // 👈 这里要用 express 的类型
import { interval, map, take, Observable } from 'rxjs';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('gs-app')
export class GsAppController {
  constructor(private readonly gsAppService: GsAppService) {}

  //文件上传测试
  @Post('/upload-images/')
  @UseInterceptors(FilesInterceptor('files')) // "files" 要和前端 formData.append('files', file) 对应
  upload(@UploadedFiles() files: Express.Multer.File[], @Query() query: any) {
    console.log('project_name', query.project_name);

    for (let i = 0; i < files.length; i++) {
      console.log(`收到的${files[i].originalname}文件大小:`, files[i].size);
    }
    return {
      message: '图片上传成功',
      saved_files: files.map((file) => ({
        filename: file.originalname,
        content_type: file.mimetype,
        saved_path: `/Users/suous/Work/gitlab/ai/3dgs/manager/data/2025-08-25/${file.originalname}`,
      })),
      storage_directory: '/Users/suous/Work/gitlab/ai/3dgs/manager/data/2025-08-25',
    };
  }

  @Post('/rebuild/vast')
  buildVast(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    console.log('收到的请求体:', body);
    if (body && body.stream) {
      res.status(HttpStatus.OK);
      // 设置 SSE 头部
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      // 模拟数据流
      const stream$ = interval(10).pipe(
        take(100),
        map((i) => `data: ${JSON.stringify({ msg: 'hello', count: i })}\n`),
      );
      // 订阅并写入响应
      const subscription = stream$.subscribe((data) => res.write(data));
      // 关闭连接时清理
      req.on('close', () => {
        subscription.unsubscribe();
        res.end();
      });
    } else {
      return {
        message: 'Vast 生成成功',
      };
    }
  }
  @Post('/rebuild/3dgs')
  buildGs(@Body() body: any, @Req() req: Request, @Res() res: Response) {
    console.log('收到的请求体:', body);
    if (body && body.stream) {
      res.status(HttpStatus.OK);
      // 设置 SSE 头部
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // 模拟数据流
      const stream$ = interval(10).pipe(
        take(100),
        map((i) => `data: ${JSON.stringify({ msg: 'hello', count: i })}\n`),
      );
      // 订阅并写入响应
      // const subscription = stream$.subscribe((data) => res.write(data));
      const subscription = stream$.subscribe({
        next: (data) => res.write(data),
        error: (err) => {
          console.error('SSE error:', err);
          res.end();
        },
        complete: () => {
          console.log('SSE completed');
          res.end(); // ✅ 数据发完自动关闭响应
        },
      });

      // 关闭连接时清理
      req.on('close', () => {
        subscription.unsubscribe();
        res.end();
      });
    } else {
      return {
        message: '3DGS 生成成功',
      };
    }
  }

  // //sse传输信息的接口
  // @Sse('/vast')
  // sendEvents(type: string): Observable<MessageEvent> {
  //   console.log('开始发送 SSE 事件');
  //   return interval(1000).pipe(
  //     take(5),
  //     map((count) => ({
  //       data: { message: `第 ${count} 条消息:${type ?? ''}`, timestamp: new Date() },
  //       id: String(count), // 可选
  //       type: 'tick', // 可选
  //       retry: 1000, // 可选
  //     })),
  //   );
  // }

  @Get('list-projects')
  listProjects() {
    console.log('列出所有项目');
    const projects = {
      workName: ['projectName1', 'projectName2'],
    };
    return projects;
  }

  //删除任务文件夹
  @Delete('/tasks/:task_name')
  deleteTask(@Param('task_name') task_name: string) {
    console.log(`删除任务: ${task_name}`);
    return { message: `任务 ${task_name} 删除成功` };
  }
  //获取任务文件夹状态
  @Get('/tasks/:task_name')
  getTaskStatus(@Param('task_name') task_name: string) {
    console.log(`获取任务: ${task_name}`);
    //running, completed, failed
    return { message: `任务 ${task_name} 获取成功`, status: 'completed' };
  }

  //获取对应任务的日志
  @Get('/tasks/:task_name/logs')
  getTaskLogs(@Param('task_name') task_name: string, @Query() stream: boolean, @Req() req: Request, @Res() res: Response) {
    if (stream) {
      res.status(HttpStatus.OK);
      // 设置 SSE 头部
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      // 模拟数据流
      const stream$ = interval(10).pipe(
        take(100),
        map((i) => `data: ${JSON.stringify({ msg: 'hello', count: i })}\n`),
      );
      // 订阅并写入响应
      const subscription = stream$.subscribe((data) => res.write(data));
      // 关闭连接时清理
      req.on('close', () => {
        subscription.unsubscribe();
        res.end();
      });
    } else {
      return {
        message: '`获取任务 ${task_name} 的日志',
      };
    }
  }

  //提供文件下载
  @Post('/download/:type')
  downloadFile(@Body() option: any, @Param('type') type: string, @Res() res: Response) {
    const filePath = `public/gs_model/model.ply`; // 替换为你的文件路径
    let file_name = `${option.namespace}-${option.project}`;
    console.log(`传入的参数: ${file_name}, ${type}`);
    //将ply模型文件直接发给前端
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=${file_name}.ply`);
    // fs.createReadStream(filePath).pipe(res);
    // 也可以使用 res.download 方法
    res.download(filePath, `${file_name}.ply`, (err) => {
      if (err) {
        console.error('文件下载错误:', err);
        res.status(500).send('文件下载失败');
      } else {
        console.log('文件下载成功');
      }
    });
  }

  @Post()
  create(@Body() createGsAppDto: CreateGsAppDto) {
    return this.gsAppService.create(createGsAppDto);
  }

  @Get()
  findAll() {
    return this.gsAppService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gsAppService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGsAppDto: UpdateGsAppDto) {
    return this.gsAppService.update(+id, updateGsAppDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gsAppService.remove(+id);
  }
}
