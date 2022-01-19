import pygame, random
from pygame import mixer

#init
pygame.init()

#window
width = 600
height = 550
pygame.display.set_caption("Snake Game")
window = pygame.display.set_mode((width, height))
pygame.display.update()

#functions
font = pygame.font.SysFont(None, 40)
def text(main_text, color_main):
    screen_text = font.render(main_text, True, color_main)
    window.blit(screen_text, [10, 10])


def plot_snake(gameWindow, color, snk_list, snake_size):
    for x, y in snk_list:
        pygame.draw.rect(gameWindow, color, [x, y, snake_size, snake_size])

def gameloop():
    blue = (0, 0, 62)
    green = (0, 153, 153)
    red = (255, 51, 0)
    white = (255, 255, 255)
    gameover =False
    snakeX = 140
    snakeY = 300
    snake_size = 18
    moveX = 0
    moveY = 0

    foodX = 200
    foodY = 300
    foodSize = 13

    fps = 25
    velocityX = 10
    velocityY = 10
    score = 0

    snk_list = []
    snk_length = 1
    clock = pygame.time.Clock()
    mixer.music.load('music/music.mp3')
    mixer.music.play(-1)
    running = True
    while running:
        if gameover == True:
            over = mixer.Sound("music/gameover.mp3")
            over.play()
            window.fill(white)
            text(main_text="Game over! Press Enter to continue", color_main=red)
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                    pygame.quit()
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_RETURN:
                        gameover = False
                        gameloop()
                        
        else:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                    pygame.quit()
                if event.type == pygame.KEYDOWN:
                    movement = mixer.Sound("music/move.mp3")
                    movement.play()
                    if event.key == pygame.K_RIGHT or event.key == pygame.K_d:
                        moveX = velocityX
                        moveY = 0
                    if event.key == pygame.K_LEFT or event.key == pygame.K_a:
                        moveX = -(velocityX)
                        moveY = 0
                    if event.key == pygame.K_DOWN or event.key == pygame.K_s:
                        moveX = 0
                        moveY = velocityY
                    if event.key == pygame.K_UP or event.key == pygame.K_w:
                        moveX = 0
                        moveY = -(velocityY)

            snakeX += moveX
            snakeY += moveY

            if abs(snakeX - foodX) < 13 and abs(snakeY - foodY) < 13:
                eat = mixer.Sound("music/food.mp3")
                eat.play()
                score += 1
                foodX = random.randint(25, (width-20))
                foodY = random.randint(120, (height-25))
                snk_length += 3

            window.fill(blue)
            head = []
            head.append(snakeX)
            head.append(snakeY)
            snk_list.append(head)

            if len(snk_list) > snk_length:
                del snk_list[0]

            if snakeX <= 25 or snakeX >= 680 or snakeY >= 530 or snakeY <=  120:
                gameover = True

            if head in snk_list[:-1]:
                gameover = True

            plot_snake(window, green, snk_list, snake_size)
            pygame.draw.rect(window, red, (foodX, foodY, foodSize, foodSize))
            pygame.draw.rect(window, white, (0, 100, 13, 450))
            pygame.draw.rect(window, white, (0, 100, 600, 13))
            pygame.draw.rect(window, white, (587, 100, 13, 450))
            pygame.draw.rect(window, white, (0, 537, 600, 13))
            score_text = "Score: "+str(score)
            text(score_text, white)

        clock.tick(fps)
        pygame.display.update()

gameloop()